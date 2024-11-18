#include <vector>
#include <algorithm>
#include <stdint.h>

extern "C" {

struct Pixel {
    uint8_t r, g, b, a;
};

class Image {
public:
    int width, height;
    Pixel* pixels;

    Image(int w, int h, Pixel* p) : width(w), height(h), pixels(p) {}

    void toGrayscale() {
        for (int i = 0; i < width * height; ++i) {
            uint8_t gray = static_cast<uint8_t>(0.299 * pixels[i].r + 0.587 * pixels[i].g + 0.114 * pixels[i].b);
            pixels[i].r = pixels[i].g = pixels[i].b = gray;
        }
    }
};

extern "C" void toGrayscale(uint8_t* imageData, int width, int height) {
    Image img(width, height, reinterpret_cast<Pixel*>(imageData));
    img.toGrayscale();
}
}
