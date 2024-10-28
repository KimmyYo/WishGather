import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomStepIndicator = ({ steps, currentPosition }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          {/* Connector Line */}
          {index !== 0 && (
            <View 
              style={[
                styles.connector,
                {backgroundColor: index <= currentPosition ? '#fe7013' : '#aaaaaa'}
              ]} 
            />
          )}
          
          {/* Step Circle */}
          <View 
            style={[
              styles.circle,
              {
                backgroundColor: index <= currentPosition ? '#fe7013' : '#ffffff',
                borderColor: index <= currentPosition ? '#fe7013' : '#aaaaaa'
              }
            ]}
          >
            {index <= currentPosition && (
              <View style={styles.innerCircle} />
            )}
          </View>
          
          {/* Step Label */}
          <Text 
            style={[
              styles.label,
              {
                color: index <= currentPosition ? '#fe7013' : '#999999',
                fontWeight: index <= currentPosition ? 'bold' : 400
              }
            ]}
          >
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  connector: {
    height: 2,
    backgroundColor: '#aaaaaa',
    position: 'absolute',
    top: 12,
    left: '-40%',
    right: '50%',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  label: {
    marginTop: 8,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default CustomStepIndicator;