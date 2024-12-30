import geopy.distance
import numpy as np
import pulp
from typing import Dict, List, Tuple

class ResourceAllocation:
    def __init__(self, temple_data: List[Dict], welfare_data: List[Dict]) -> None:
        self.offering_list = self._optimize_temple_offering_list(temple_data)
        self.welfare_data = welfare_data
        self.welfare_distances_indices, self.welfare_weights = self._calc_distances()
        self.welfare_prefs = self._calc_preferences()
        self.welfare_people = [welfare_data[i]["NUM_OF_PEOPLE"] for i in self.welfare_distances_indices]

    def _optimize_temple_offering_list(self, temple_data: List[Dict]) -> Dict:
        print(temple_data)
        # 簡化供品資料結構
        first_temple = temple_data[0]
        coord = self._parse_coord(first_temple["COORDINATE"])
        
        offerings = {}
        curr_type = None
        curr_amount = 0
        curr_oids = set()
        
        result = {
            'tID': first_temple["tID"],
            'COORD': coord,
            'TYPE': [],
            'AMOUNT': [],
            'oID_LIST': [],
            'oID_AMOUNT_MAP': {}
        }

        # 單次遍歷處理所有資料
        for item in temple_data:
            if curr_type != item["OFFERING_TYPE"]:
                if curr_type is not None:
                    result['TYPE'].append(curr_type)
                    result['AMOUNT'].append(curr_amount)
                    result['oID_LIST'].append(list(curr_oids))
                curr_type = item["OFFERING_TYPE"]
                curr_amount = 0
                curr_oids = set()
            
            curr_amount += item["OFFERING_AMOUNT"] * 10
            curr_oids.add(item["oID"])
            result['oID_AMOUNT_MAP'][item["oID"]] = result['oID_AMOUNT_MAP'].get(
                item["oID"], 0) + item["OFFERING_AMOUNT"]

        # 加入最後一組資料
        if curr_type:
            result['TYPE'].append(curr_type)
            result['AMOUNT'].append(curr_amount)
            result['oID_LIST'].append(list(curr_oids))

       
        return result

    def _parse_coord(self, coord_str: str) -> Tuple[float, float]:
        lon, lat = coord_str.replace('POINT(', '').replace(')', '').split()
        return (float(lat), float(lon))

    def _calc_distances(self) -> Tuple[List[int], List[int]]:
        coords = [self._parse_coord(w["COORDINATE"]) if w["COORDINATE"] else None 
                 for w in self.welfare_data]
        
        distances = [geopy.distance.geodesic(self.offering_list["COORD"], coord).km 
                    if coord else float('inf') for coord in coords]
        
        indices = np.argsort(distances)
        weights = [0] * len(distances)
        max_weight = len(distances)
        
        for i, idx in enumerate(indices):
            weights[idx] = max_weight - i
            
        return indices, weights

    def _calc_preferences(self) -> List[List[int]]:
        all_types = set('ABCDEF')
        default_weight = 0.5
        def process_preferences(welfare: Dict) -> List[float]:
            if not welfare.get("PREFERENCES"):  # 處理 null 或空字符串
                return [default_weight] * len(all_types)
            
            prefs = welfare["PREFERENCES"].split(",")
            if not any(prefs):  # 處理空列表或只包含空字符串的情況
                return [default_weight] * len(all_types)
            
            return [1.0 if p in prefs else 0.0 for p in all_types]

        return [process_preferences(w) for w in self.welfare_data]
    
    def resource_allocation(self) -> Dict:
        prob = pulp.LpProblem("Resource_Allocation", pulp.LpMaximize)
        
        # 使用列表推導式優化變數創建
        x = {(i, j): pulp.LpVariable(f'x_{i}_{j}', lowBound=0, cat='Integer')
             for i in range(len(self.welfare_distances_indices))
             for j in range(len(self.offering_list["TYPE"]))}
        
        # 簡化目標函數
        prob += pulp.lpSum(self.welfare_weights[i] * self.welfare_prefs[i][j] * x[i, j]
                          for i, j in x)
        
        # 批量添加約束條件
        for j in range(len(self.offering_list["AMOUNT"])):
            prob += pulp.lpSum(x[i, j] for i in range(len(self.welfare_distances_indices))) <= self.offering_list["AMOUNT"][j]
            
        for i in range(len(self.welfare_people)):
            prob += pulp.lpSum(x[i, j] for j in range(len(self.offering_list["AMOUNT"]))) <= self.welfare_people[i]

        prob.solve()
        
        return {k: v.value() for k, v in x.items() if v.value() > 0} if prob.status == 1 else {}

    def distribute_offerings(self, allocation: Dict) -> Dict:
        result = {}
        for offering_type in range(len(self.offering_list["TYPE"])):
            curr_requests = {
                self.welfare_data[wID]["wID"]: int(amount) 
                for (wID, t), amount in allocation.items() 
                if t == offering_type and amount > 0
            }
            
            if not curr_requests:
                continue
                
            curr_offerings = {
                oID: self.offering_list["oID_AMOUNT_MAP"][oID] 
                for oID in self.offering_list["oID_LIST"][offering_type]
            }
            
            dist = self._distribute_single_type(curr_requests, curr_offerings)
            if dist:
                result[self.offering_list["TYPE"][offering_type]] = dist
                
        return result

    def _distribute_single_type(self, requests: Dict[str, int], offerings: Dict[str, int]) -> Dict[str, str]:
        result = {}
        for wID, amount in requests.items():
            alloc = {}
            remaining = amount
            per_offering = amount // len(offerings)
            
            for oID, available in offerings.items():
                if available <= 0 or remaining <= 0:
                    continue
                    
                given = min(per_offering, available, remaining)
                if given > 0:
                    alloc[oID] = given
                    offerings[oID] -= given
                    remaining -= given
            
            if alloc:
                result[wID] = ",".join(f"{oID}-{amt}" for oID, amt in alloc.items())
                
        return result
    
    def format_allocation_result(self, allocation: Dict) -> Dict[str, List]:
        """
        將資源分配結果格式化為符合資料庫結構的格式
        
        Returns:
            Dict 包含兩個鍵：
            - 'matching': List[Dict] 媒合表的資料
            - 'matching_detail': List[Dict] 媒合細項表的資料
        """
        matching_records = []
        matching_detail_records = []
        
        # 整理分配結果，按照welfare ID分組
        welfare_allocations = {}
        for (welfare_idx, type_idx), amount in allocation.items():
            if amount <= 0:
                continue
                
            wID = self.welfare_data[welfare_idx]["wID"]
            if wID not in welfare_allocations:
                welfare_allocations[wID] = []
            welfare_allocations[wID].append((type_idx, amount))

        # 生成媒合記錄
        for wID, allocations in welfare_allocations.items():
            # 建立媒合主表記錄
            matching_record = {
                "tID": self.offering_list["tID"],
                "wID": wID,
                "TYPE_A": 0,
                "TYPE_B": 0,
                "TYPE_C": 0,
                "TYPE_D": 0,
                "TYPE_E": 0,
                "TYPE_F": 0,
                "BOOKED_STATUS": 'A',  # 預設為已預約
                "DELIVER_STATUS": 'A',  # 預設為未配送
                "CONFIRMED_STATUS": 'A',  # 預設為未確認
                "SUPPLY_CONTENT": ""   # 可以留空或加入摘要
            }
            
            # 更新各TYPE的狀態
            for type_idx, _ in allocations:
                type_name = self.offering_list["TYPE"][type_idx]
                matching_record[f"TYPE_{type_name}"] = 1
            
            matching_records.append(matching_record)

        # 生成媒合細項記錄
        distributed_result = self.distribute_offerings(allocation)
        welfare_has_details = set()
        for type_name, distributions in distributed_result.items():
            for wID, allocation_str in distributions.items():
                # 解析分配字串 (例如 "1-10,2-5" -> [(1,10), (2,5)])
                items = [item.split('-') for item in allocation_str.split(',')]
                
                for oID, amount in items:
                    detail_record = {
                        "wID": wID,
                        "TYPE": type_name,
                        "oID": int(oID),
                        "amount": int(amount)
                    }
                    matching_detail_records.append(detail_record)
                    welfare_has_details.add(wID)
        matching_records = [record for record in matching_records if record["wID"] in welfare_has_details]

        return {
            "matching": matching_records,
            "matching_detail": matching_detail_records
        }

    def json_result(self, optimal_allocation: Dict) -> Dict[str, List]:
        """
        生成完整的JSON結果
        """
        return self.format_allocation_result(optimal_allocation)