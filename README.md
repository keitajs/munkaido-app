# Munkaidő App

Frontend: [AngularJS](https://angularjs.org/) <br/>
Backend: [NodeJS](https://nodejs.org/en)


## Telepítés


```bash
cd .\API\
npm install
```

> [!NOTE]
> Adatbázist, a benne lévő táblákat és közöttük lévő kapcsolatokat a Backend létrehozza az első indításkor.


## Indítás


### Backend

#### .env

```dotenv
# Backend    -  Port: Ezen fog futni a backend
PORT=2000

# Adatbázis  -  Host, Felhasználónév, Jelszó, Adatbázis név
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=513szoft_munkaidoapp
```

#### Indítási parancsok

```bash
npm run start # Normál indítás
npm run dev # Fejlesztői indítás
```


### Frontend


Indítsd el a ``Public/index.html``-t Live Server-rel.

