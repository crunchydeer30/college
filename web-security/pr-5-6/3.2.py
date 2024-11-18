
from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher_suite = Fernet(key)

def encrypt_data(data):
    return cipher_suite.encrypt(data.encode())

def decrypt_data(encrypted_data):
    return cipher_suite.decrypt(encrypted_data).decode()

data = "Sensitive data"
encrypted_data = encrypt_data(data)
print(encrypted_data)

decrypted_data = decrypt_data(encrypted_data)
print(decrypted_data)