
# NodePop

## Description

NodePop is a WebApp where users can publish Advertisements to sale or search all kinds of second-hand products.
It was developed using Node.Js, Express and MongoDB 

## Database Setup

To inicializite te database use the following command:

```
npm run installDB
```

## To run the App in dev mode

```
npm run dev
```

## To run the App in production mode

```
npm run start
```

## API 
Anuncios [/apiv1/anuncios]

Resource representing collection of anuncios

    Attributes (object)
    anuncios (array[Anuncio])

This returns a Json file with the complete list of the existing ads in the database.

##Actions:

**GET** method can be filtered with one or several of the following parameters:

* nombre=[/^string/] Show all the ads wich name starts with the given string. 
* limit=[integer] Indicates the amount of ads to show
* tag=[string] Filter the ads by the given tag 
* precio= can be use with any of the following combinations:
  * [integer]-[integer] it will search all the products with price between those two values.    
  * [integer]- it will search all the products with price greater than that value.
  * -[integer] it will search all the products with price lower than that value.
  * [integer] show the all the products wich their price is equal to the given number.
* venta=[boolean] Indicates if we want to retreive products that are for sale or for search.
* sort=[string] Order the list of products based on the given field.
* skip[integer] Starts for number of row indicated.

**POST** create new Ads on the database with the following parameters:

* nombre=[string] - required
* precio=[integer] - required
* venta=[boolean] - required
* tags=[array[strings]]
* foto=[string]

## Success Response

If success:

content {"success": true, "result": [anuncios]}