Welcome to BlankPage, a web application to send and receive messages annonymously.

# Dependencies
To run this application these following dependencies needs to be installed on your computer. Refer to their repective websites for installation instructions.
* MongoDB 5.0.6
* Angular 13.1.3
* NodeJS 16.14.0

# Build and Run
Download and extract the entire project and go to root folder. Open a terminal window and type following command for running angular.

```
cd ./balnkpage-front/
npm install
ng serve
```
Open another terminal window on the same directory and type the following commands for running back-end nestjs server.

```
cd ..
cd ./blankpage-back/
npm install
npm run start
```

# Open Project
Go to a browser and type the following address on address bar.
```
localhost:4200
```
This will open the sign up page.

To send messages copy the unique code of a user and go to:
```
localhost:4200/writeMessage
```


