#include <cstdlib>
#include <ctime>
#include <vector>
#include <algorithm>
#include <numeric>
#include <emscripten/emscripten.h>

extern "C" {
    
    void EMSCRIPTEN_KEEPALIVE gen_random_numbers(int* arr, int size, int min, int max) {
        std::srand(std::time(nullptr));
        for (int i = 0; i < size; ++i) {
            arr[i] = min + std::rand() % (max - min + 1);
        }
    }

    
    double EMSCRIPTEN_KEEPALIVE calc_mean(int* arr, int size) {
        int sum = std::accumulate(arr, arr + size, 0);
        return static_cast<double>(sum) / size;
    }

    
    int EMSCRIPTEN_KEEPALIVE calc_max(int* arr, int size) {
        return *std::max_element(arr, arr + size);
    }

    
    int EMSCRIPTEN_KEEPALIVE calc_min(int* arr, int size) {
        return *std::min_element(arr, arr + size);
    }
}
