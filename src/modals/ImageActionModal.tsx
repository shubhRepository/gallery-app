import { Text, Modal, StyleSheet, View, TouchableOpacity } from 'react-native';

export default function ImageActionModal({
  visible,
  onClose,
  onShare,
  onDelete,
}: {
  visible: boolean;
  onClose: () => void;
  onShare: () => void;
  onDelete: () => void;
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={onShare} style={styles.btn}>
            <Text style={styles.action}>Share</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={onDelete} style={styles.btn}>
            <Text style={[styles.action, styles.destructive]}>Delete</Text>
          </TouchableOpacity>
          <View style={styles.cancelWrapper}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  modalView: {
    width: '100%',
    height: '25%',
    backgroundColor: '#353630',
    borderRadius: 30,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    gap: 8,
  },

  btn: {
    width: '100%',
  },

  action: {
    paddingVertical: 14,
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center',
  },

  destructive: {
    color: '#ff453a',
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#4a4b45',
  },

  cancelWrapper: {
    marginTop: 8,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#4A4B45',
  },

  cancel: {
    paddingVertical: 14,
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
});
