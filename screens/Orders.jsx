// Importowanie niezbędnych modułów z React Native
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

const Orders = () => {
    const [orders, setOrders] = useState([]); // Stan dla przechowywania danych zamówień
    const [loading, setLoading] = useState(true); // Stan dla śledzenia statusu ładowania

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/api/orders'); // Zakładam, że endpoint to /orders
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Problem z pobraniem zamówień:', error);
            throw error;
        }
    };
    useEffect(() => {
        // Logika do ładowania danych zamówień
        // Przykład: Żądanie do API i aktualizacja stanu
        // Załóżmy, że masz funkcję fetchOrders() do pobierania danych zamówień
        fetchOrders()
          .then(data => {
            setOrders(data);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
          });

        // Poniżej znajduje się tymczasowa symulacja ładowania danych
        setTimeout(() => {
            setOrders([{ id: 1, name: 'Przykładowe Zamówienie 1' }, { id: 2, name: 'Przykładowe Zamówienie 2' }]); // Symulowane dane
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        // Wyświetlanie wskaźnika aktywności podczas ładowania danych
        return <ActivityIndicator size="large" />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.orderItem}>
                        <Text style={styles.orderText}>Zamówienie: {item.name}</Text>
                        {/* Tutaj możesz dodać więcej szczegółów dotyczących zamówienia */}
                    </View>
                )}
            />
        </View>
    );
};

export default Orders;

// Definicja stylów dla komponentu
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    orderItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    orderText: {
        fontSize: 18,
    },
    // Możesz dodać więcej stylów tutaj
});
