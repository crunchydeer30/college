#include <emscripten.h>
#include <vector>
#include <algorithm>
#include <chrono>

using namespace std;

extern "C" {

    EMSCRIPTEN_KEEPALIVE
    void bubbleSort(int* arr, int n) {
        for (int i = 0; i < n - 1; ++i) {
            for (int j = 0; j < n - i - 1; ++j) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr[j], arr[j + 1]);
                }
            }
        }
    }

    EMSCRIPTEN_KEEPALIVE
    void merge(int* arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        vector<int> L(n1), R(n2);
        for (int i = 0; i < n1; ++i) {
            L[i] = arr[left + i];
        }
        for (int i = 0; i < n2; ++i) {
            R[i] = arr[mid + 1 + i];
        }

        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                ++i;
            } else {
                arr[k] = R[j];
                ++j;
            }
            ++k;
        }

        while (i < n1) {
            arr[k] = L[i];
            ++i;
            ++k;
        }

        while (j < n2) {
            arr[k] = R[j];
            ++j;
            ++k;
        }
    }

    EMSCRIPTEN_KEEPALIVE
    void mergeSort(int* arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    EMSCRIPTEN_KEEPALIVE
    double measureTimeBubbleSort(int* arr, int n) {
        auto start = chrono::high_resolution_clock::now();
        bubbleSort(arr, n);
        auto end = chrono::high_resolution_clock::now();
        chrono::duration<double> duration = end - start;
        return duration.count();
    }

    EMSCRIPTEN_KEEPALIVE
    double measureTimeMergeSort(int* arr, int n) {
        auto start = chrono::high_resolution_clock::now();
        mergeSort(arr, 0, n - 1);
        auto end = chrono::high_resolution_clock::now();
        chrono::duration<double> duration = end - start;
        return duration.count();
    }

}
