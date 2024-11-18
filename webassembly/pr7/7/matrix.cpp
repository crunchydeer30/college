#include <vector>
#include <iostream>

extern "C" {

void addMatrices(double* matA, double* matB, double* result, int rows, int cols) {
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
            result[i * cols + j] = matA[i * cols + j] + matB[i * cols + j];
        }
    }
}

void multiplyMatrices(double* matA, double* matB, double* result, int rowsA, int colsA, int colsB) {
    for (int i = 0; i < rowsA; ++i) {
        for (int j = 0; j < colsB; ++j) {
            result[i * colsB + j] = 0;
            for (int k = 0; k < colsA; ++k) {
                result[i * colsB + j] += matA[i * colsA + k] * matB[k * colsB + j];
            }
        }
    }
}

void transposeMatrix(double* mat, double* result, int rows, int cols) {
    for (int i = 0; i < rows; ++i) {
        for (int j = 0; j < cols; ++j) {
            result[j * rows + i] = mat[i * cols + j];
        }
    }
}

}

