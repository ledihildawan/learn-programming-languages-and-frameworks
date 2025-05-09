import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        backgroundColor: Color(0xFF13131E),
        body: Center(
          child: Image(image: AssetImage('images/swords.png')),
        ),
      ),
    );
  }
}
