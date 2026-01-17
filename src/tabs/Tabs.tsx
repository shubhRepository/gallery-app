import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TABS } from '../constants/constants';
export default function Tabs({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (value: string) => void;
}) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setSelected(TABS.PHOTO)}
      >
        <Text
          style={[styles.tabText, selected === TABS.PHOTO && styles.selected]}
        >
          Photo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setSelected(TABS.ALBUM)}
      >
        <Text
          style={[styles.tabText, selected === TABS.ALBUM && styles.selected]}
        >
          Album
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#353630',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 4,
  },
  tab: {
    flex: 1,
  },
  tabText: {
    textAlign: 'center',
    color: '#99ae54',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  selected: {
    color: 'white',
    backgroundColor: '#99ae54',
  },
});
