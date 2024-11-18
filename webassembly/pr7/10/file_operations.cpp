#include <emscripten.h>
#include <fstream>
#include <string>
#include <iostream>

using namespace std;

extern "C" {

    EMSCRIPTEN_KEEPALIVE
    const char* readFile(const char* fileName) {
        static string fileContent;
        ifstream file(fileName);
        if (file.is_open()) {
            string line;
            fileContent.clear();
            while (getline(file, line)) {
                fileContent += line + "\n";
            }
        } else {
            fileContent = "File not found.";
        }
        return fileContent.c_str();
    }
}
