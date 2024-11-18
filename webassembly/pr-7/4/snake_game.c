#include <emscripten.h>
#include <stdlib.h>

#define WIDTH 20
#define HEIGHT 20
#define MAX_LENGTH 100

typedef struct {
    int x;
    int y;
} Position;

typedef struct {
    Position body[MAX_LENGTH];
    int length;
    int direction
} Snake;

Snake snake;
Position food;
int game_over = 0;

// Прототипы функций
void generate_food();

// Инициализация игры
EMSCRIPTEN_KEEPALIVE
void initialize_game() {
    snake.length = 1;
    snake.body[0].x = WIDTH / 2;
    snake.body[0].y = HEIGHT / 2;
    snake.direction = 1;
    generate_food();
    game_over = 0;
}

EMSCRIPTEN_KEEPALIVE
void generate_food() {
    food.x = rand() % WIDTH;
    food.y = rand() % HEIGHT;
}

// Обновление положения змейки
EMSCRIPTEN_KEEPALIVE
void update_snake() {
    if (game_over) return;

    Position next_position = snake.body[0];
    switch (snake.direction) {
        case 0: next_position.y -= 1; break;
        case 1: next_position.x += 1; break;
        case 2: next_position.y += 1; break;
        case 3: next_position.x -= 1; break;
    }

    if (next_position.x < 0 || next_position.x >= WIDTH || 
        next_position.y < 0 || next_position.y >= HEIGHT) {
        game_over = 1;
        return;
    }
    for (int i = 0; i < snake.length; i++) {
        if (snake.body[i].x == next_position.x && snake.body[i].y == next_position.y) {
            game_over = 1;
            return;
        }
    }

    for (int i = snake.length; i > 0; i--) {
        snake.body[i] = snake.body[i - 1];
    }
    snake.body[0] = next_position;

    if (next_position.x == food.x && next_position.y == food.y) {
        if (snake.length < MAX_LENGTH) snake.length++;
        generate_food();
    }
}

EMSCRIPTEN_KEEPALIVE
void change_direction(int new_direction) {
    if (abs(new_direction - snake.direction) != 2) {
        snake.direction = new_direction;
    }
}

EMSCRIPTEN_KEEPALIVE
int* get_snake_positions() {
    static int positions[MAX_LENGTH * 2];
    for (int i = 0; i < snake.length; i++) {
        positions[i * 2] = snake.body[i].x;
        positions[i * 2 + 1] = snake.body[i].y;
    }
    return positions;
}

EMSCRIPTEN_KEEPALIVE
int get_snake_length() {
    return snake.length;
}

EMSCRIPTEN_KEEPALIVE
int get_food_x() {
    return food.x;
}

EMSCRIPTEN_KEEPALIVE
int get_food_y() {
    return food.y;
}

EMSCRIPTEN_KEEPALIVE
int is_game_over() {
    return game_over;
}
