#include <iostream>
#include <random>
#include <emscripten.h>

extern "C" {
  int rand_num(int min, int max) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<int> dis(1, 100);
    return dis(gen);
  }

  void rand_array(int* arr, int size, int min, int max) {
    for (int i = 0; i < size; i++) {
      arr[i] = rand_num(min, max);
    }
  }

  double calc_mean(int* arr, int size) {
      int sum = std::accumulate(arr, arr + size, 0);
      return static_cast<double>(sum) / size;
  }

  int calc_max(int* arr, int size) {
      return *std::max_element(arr, arr + size);
  }

  int calc_min(int* arr, int size) {
      return *std::min_element(arr, arr + size);
  }
}
