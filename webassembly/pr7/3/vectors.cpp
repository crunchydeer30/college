#include <vector>

extern "C" {
  void add(int* v1, int* v2, int* res) {
    for (int i = 0; i < 2; ++i) {
        res[i] = v1[i] + v2[i];
    }
  }

  void sub(int* v1, int* v2, int* res, int size) {
    for (int i = 0; i < size; ++i) {
        res[i] = v1[i] - v2[i];
    }
  }

  int scalar(int* v1, int* v2, int size) {
    int product = 0;
    for (int i = 0; i < size; ++i) {
        product += v1[i] * v2[i];
    }
    return product;
  }
}
