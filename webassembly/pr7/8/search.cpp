#include <vector>
#include <string>
#include <algorithm>
#include <cstring>
#include <emscripten.h>

extern "C" {

int findSubstring(const char* str, const char* substr) {
    std::string s = str;
    std::string sub = substr;
    size_t pos = s.find(sub);
    return (pos != std::string::npos) ? static_cast<int>(pos) : -1;
}

int* findAllOccurrences(const char* str, const char* substr, int* size) {
    std::vector<int> positions;
    std::string s = str;
    std::string sub = substr;
    size_t pos = s.find(sub);
    while (pos != std::string::npos) {
        positions.push_back(static_cast<int>(pos));
        pos = s.find(sub, pos + 1);
    }
    int* result = (int*) malloc(positions.size() * sizeof(int));
    for (size_t i = 0; i < positions.size(); ++i) {
        result[i] = positions[i];
    }
    *size = static_cast<int>(positions.size());
    return result;
}

int findSubstringCaseInsensitive(const char* str, const char* substr) {
    std::string s = str;
    std::string sub = substr;
    std::transform(s.begin(), s.end(), s.begin(), ::tolower);
    std::transform(sub.begin(), sub.end(), sub.begin(), ::tolower);
    size_t pos = s.find(sub);
    return (pos != std::string::npos) ? static_cast<int>(pos) : -1;
}

void freeMemory(void* ptr) {
    free(ptr);
}

}
