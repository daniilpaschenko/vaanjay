import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});
  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _credentialContoller = TextEditingController();
  final _passwordController = TextEditingController();
  String? _error;
  bool _loading = false;

  Future<void> _login() async {
    setState(() {
      _error = null;
      _loading = true;
    });
    try {} catch (e) {
      setState(() => _error = 'Login failed');
    } finally {
      setState(() {
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('VAANJAY', style: TextStyle(
              fontSize: 42,
              fontWeight: FontWeight.w800,
            )),
            TextField(
              controller: _credentialContoller,
              decoration: InputDecoration(
                hintText: 'Username, email, or phone',
                filled: true,
                fillColor: Color(0xFFF8FAFC),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10)
                )
              ),
            ),
            TextField(
              controller: _passwordController,
              obscureText: true,
            ),
            if (_error != null) Text(_error!, style: TextStyle(
              color: Colors.red,
            )),
            ElevatedButton(
              onPressed: _loading ? null: _login,
              child: Text(_loading ? 'Signing in...' : 'Sign In'),
            )
          ]
          )
        ),
    );
  }
}
