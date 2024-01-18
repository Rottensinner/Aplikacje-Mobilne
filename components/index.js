// Importowanie i eksportowanie komponentów z różnych sekcji aplikacji
import Welcome from "./home/Welcome"; // Komponent powitalny (pierwsze okno)
import ProductCardView from "./products/ProductCardView"; // Komponent karty produktu
import ProductRow from "./products/ProductRow"; // Komponent wiersza produktów
import ProductList from "./products/ProductList"; // Komponent listy produktów
import BackBtn from "./BackBtn"; // Komponent przycisku powrotu
import Button from "./Button"; // Komponent uniwersalnego przycisku

// Eksportowanie komponentów do użycia w innych plikach
export {
    Welcome, // Eksport komponentu Welcome
    ProductCardView, // Eksport komponentu ProductCardView
    ProductRow, // Eksport komponentu ProductRow
    ProductList, // Eksport komponentu ProductList
    BackBtn, // Eksport komponentu BackBtn
    Button, // Eksport komponentu Button
};
