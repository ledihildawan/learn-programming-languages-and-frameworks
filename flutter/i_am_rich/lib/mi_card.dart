import "package:flutter/material.dart";

class MiCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.teal,
        body: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              CircleAvatar(
                radius: 50,
                backgroundImage: NetworkImage(
                    'https://ledihildawan.github.io/images/profile.jpg'),
              ),
              Text(
                'Ledi Hildawan',
                style: TextStyle(
                  fontSize: 40,
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                'Software Developer',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(
                height: 20,
                width: 128,
                child: Divider(color: Colors.teal.shade100),
              ),
              Card(
                margin: EdgeInsets.symmetric(
                  vertical: 10,
                  horizontal: 25,
                ),
                child: ListTile(
                  leading: Icon(
                    Icons.phone,
                    color: Colors.teal,
                  ),
                  title: Text(
                    '+628 5161 61897',
                    style: TextStyle(
                      color: Colors.teal.shade900,
                    ),
                  ),
                ),
              ),
              Card(
                margin: EdgeInsets.symmetric(
                  vertical: 10,
                  horizontal: 25,
                ),
                child: ListTile(
                  leading: Icon(
                    Icons.email,
                    color: Colors.teal,
                  ),
                  title: Text(
                    'lhildawan@gmail.com',
                    style: TextStyle(
                      color: Colors.teal.shade900,
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
      theme: ThemeData(
        fontFamily: 'Plus Jakarta Sans',
      ),
    );
  }
}
