# REST-api

//////////////////////////////////////////////////////////////// Rest-API //////////////////////////////////////////////////////////

/////////////////////////
///// Projekt info /////
///////////////////////

Jag har skapat ett rest-api och ett enkelt clientgränssnitt som hämtar data från en json-fil med hjälp av api´et.
Jag har skapat fem stycken endpoints.

En för att hämta all data från json-filen.
En för att hämta en specifik produkt från jsn-filen.
En för att ta bort en produkt.
En för att ändra en produkt.
En för att skapa en produkt.

Objekten som finns i json-filen har 4 st egenskaper varav 3 syns i client gränssnittet och den 4e som är id används för requests osv.

////////////////////
/////// Krav //////
//////////////////

Dessa krav är uppfyllda.

1. Alla 5 endpoints finns.

2. Alla enspoints kan nås via rest client

3. Datan sparas i en json-fil.(VG)

4. Github har används.

5. Readme fil finns.

6. json-filen uppdateras när ngt läggs till eller tas bort eller ändras.(VG)

7. Gränsnitt där alla endpoints anropas finns.(VG)

8. Get endpoint för att söka efter specifik produkt finns.(VG)

/////////////////////////////////
///// Hur projektet körs ///////
///////////////////////////////

öppna projektet i vs och kör npm install i terminalen.

Då skall paketen "express", "nodemon", och "body-parser" installeras.

Öppna terminalen och skriv npm start.

Öppna sedan en webbläsare och skriv in http://localhost:3000/

För att testa requests öppnar du rest client och skicka requestet som hämtar alla produkter.

Man kan då se produkterna i jsonfilen och deras id.

För att köra request som kräver id så använd ngt av dom produkt-id som finns i jsonfilen.

Länk till githubrepot: https://github.com/olofWallgren/REST-api
