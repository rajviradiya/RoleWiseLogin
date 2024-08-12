import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Linking, ActivityIndicator } from 'react-native';
import PdfLogo from '../assets/svg/pdfLogo';
import ClockIcon from '../assets/svg/clock';
import LeftArrow from '../assets/svg/leftArrow';

const MediaModal = ({ visible, close, foldercontent, loading, folderName }) => {
     const formatModifiedDate = (dateString) => {
          const date = new Date(dateString);
          if (isNaN(date)) return null;
          let hours = date.getHours();
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12;
          return `${hours}:${minutes} ${ampm}`;
     };

     const sortedFolderContent = foldercontent.sort((a, b) => {
          if (a.mimeType.startsWith('image/') && !b.mimeType.startsWith('image/')) return -1;
          if (!a.mimeType.startsWith('image/') && b.mimeType.startsWith('image/')) return 1;
          return a.title.localeCompare(b.title);
     });

     return (
          <Modal
               transparent={true}
               visible={visible}
               onRequestClose={close}
               animationType="slide"
          >
               <View style={styles.foldermodalView}>
                    <View style={styles.headerContainer}>
                         <TouchableOpacity onPress={close}>
                              <LeftArrow />
                         </TouchableOpacity>
                         <Text style={styles.modalTitle}>{folderName}</Text>
                    </View>
                    {loading ? (
                         <View style={styles.fileLoading}>
                              <ActivityIndicator size="large" color="#ffff" />
                         </View>
                    ) : (
                         <>
                              {sortedFolderContent.length === 0 ? (
                                   <Text style={styles.noFilesText}>No files available</Text>
                              ) : (
                                   <FlatList
                                        data={sortedFolderContent}
                                        renderItem={({ item }) => (
                                             <TouchableOpacity style={styles.fileContainer} onPress={() => Linking.openURL(`https://drive.google.com/uc?export=view&id=${item.id}`)}>
                                                  {item.mimeType.startsWith('image/') && (
                                                       <View style={styles.imageContainer}>
                                                            <View><Ionicons name="image" size={70} color="black" /></View>
                                                            <Image
                                                                 source={{ uri: `https://drive.google.com/uc?export=view&id=${item.id}` }}
                                                                 resizeMode="contain"
                                                            />
                                                            <Text style={styles.fileName}>{item.title}</Text>
                                                       </View>
                                                  )}
                                                  {item.mimeType === 'application/pdf' && (
                                                       <>
                                                            <PdfLogo />
                                                            <Text style={styles.fileName}>{item.title}</Text>
                                                       </>
                                                  )}
                                             </TouchableOpacity>
                                        )}
                                        keyExtractor={(item) => item.id}
                                   />
                              )}
                         </>
                    )}
               </View>
          </Modal>
     );
};

const styles = StyleSheet.create({
     foldermodalView: {
          width: "100%",
          height: "100%",
          backgroundColor: 'white',
          padding: 16,
     },
     headerContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 30,
     },
     modalTitle: {
          fontSize: 22,
          fontWeight: 'bold',
          color: "black",
          margin: 'auto'
     },
     fileLoading: {
          flex: 1,
          justifyContent: "center",
     },
     fileContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
     },
     imageContainer: {
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%'
     },
     fileName: {
          color: "black",
          width: '45%',
          marginLeft: 10,
     },
     timeContainer: {
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
          width: "25%"
     },
     itemTime: {
          color: "#FFFFFF",
          fontFamily: "Inter-Regular",
          fontWeight: "400",
          fontSize: 12,
          marginLeft: 8,
     },
     noFilesText: {
          color: '#ffffff',
          fontSize: 18,
          alignItems: "center",
          margin: "auto",
          marginTop: 20,
     },
});

export default MediaModal;
