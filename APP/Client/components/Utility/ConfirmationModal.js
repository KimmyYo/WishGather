import { React, useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

function ConfirmationModal({ visible, onClose, orgName, onUpdate }){

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <Text style={styles.modalText}>確認媒合{orgName} ?</Text>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={onClose} 
                        >
                        <Text style={styles.modalButtonText}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButtonConfirm}
                            onPress={onUpdate} 
                        >
                        <Text style={styles.modalButtonText}>確認</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalText: {
        fontWeight:'bold',
        fontSize: 18,
        marginBottom: 20,
        color:'#4F4F4F',
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
      },
      modalButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
      },
      modalButtonConfirm: {
        backgroundColor: '#FF7A00',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
      },
      modalButtonText: {
        fontWeight:'bold',
        fontSize: 16,
        color: 'white',
      }
})

export default ConfirmationModal;