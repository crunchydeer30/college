#include <string>
#include <iostream>
#include <emscripten.h>

extern "C" {
  char* caesarEncrypt(const char* plaintext, int shift) {
    char* ciphertext = new char[strlen(plaintext) + 1];
    strncpy(ciphertext, plaintext, strlen(plaintext) + 1);

    for (char* c = ciphertext; *c; ++c) {
      if (*c >= 'a' && *c <= 'z') {
        *c = 'a' + (*c - 'a' + shift) % 26;
      } else if (*c >= 'A' && *c <= 'Z') {
        *c = 'A' + (*c - 'A' + shift) % 26;
      }
    }

    return ciphertext;
  }

  char* caesarDecrypt(const char* ciphertext, int shift) {
    char* plaintext = new char[strlen(ciphertext) + 1];
    strncpy(plaintext, ciphertext, strlen(ciphertext) + 1);

    for (char* c = plaintext; *c; ++c) {
      if (*c >= 'a' && *c <= 'z') {
        *c = 'a' + (*c - 'a' - shift + 26) % 26;
      } else if (*c >= 'A' && *c <= 'Z') {
        *c = 'A' + (*c - 'A' - shift + 26) % 26;
      }
    }

    return plaintext;
  }

  char* xorEncrypt(const char* plaintext, int key) {
    char* ciphertext = new char[strlen(plaintext) + 1];
    strncpy(ciphertext, plaintext, strlen(plaintext) + 1);

    for (char* c = ciphertext; *c; ++c) {
      *c = *c ^ key;
    }

    return ciphertext;
}

char* xorDecrypt(const char* ciphertext, int key) {
    char* plaintext = new char[strlen(ciphertext) + 1];
    strncpy(plaintext, ciphertext, strlen(ciphertext) + 1);

    for (char* c = plaintext; *c; ++c) {
      *c = *c ^ key;
    }

    return plaintext;
}
}