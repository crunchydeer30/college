#include <emscripten.h>
#include <vector>
#include <cstdio>

extern "C" {
  void add(int* m1, int* m2, int* result, int rows, int cols) {
      printf("Adding Matrices...\n");
      for (int i = 0; i < rows; ++i) {
          for (int j = 0; j < cols; ++j) {
              result[i * cols + j] = m1[i * cols + j] + m2[i * cols + j];
          }
      }
  }

  void mult(int* m1, int* m2, int* result, int rowsA, int colsA, int colsB) {
      for (int i = 0; i < rowsA; ++i) {
          for (int j = 0; j < colsB; ++j) {
              result[i * colsB + j] = 0;
              for (int k = 0; k < colsA; ++k) {
                  result[i * colsB + j] += m1[i * colsA + k] * m2[k * colsB + j];
              }
          }
      }
  }

  void transpose(int* matrix, int* result, int rows, int cols) {
      for (int i = 0; i < rows; ++i) {
          for (int j = 0; j < cols; ++j) {
              result[j * rows + i] = matrix[i * cols + j];
          }
      }
  }
}
