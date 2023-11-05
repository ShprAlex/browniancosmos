import pygame
import sys
from brownian_to_wave import Simulation


def main():
    pygame.init()

    # Set the dimensions of the canvas
    canvas_width = 1200
    canvas_height = 800
    histogram_size = 400
    max_population = 100
    cell_size = max(1, canvas_height // histogram_size)  # Size of each cell (square) in pixels
    velocity = 5

    # Calculate the number of columns to fill the whole width of the window
    grid_width = canvas_width // cell_size

    # Create the Pygame screen
    screen = pygame.display.set_mode((canvas_width, canvas_height))

    simulation = Simulation(
        max_population=max_population, histogram_size=histogram_size
    )

    progress = 0
    while True:
        progress += 1
        simulation.step(velocity)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        n = int(pow(1.0085, abs((progress + grid_width) % (grid_width * 2) - grid_width)))

        smooth = False
        red_column = simulation.to_wave(n, smooth)
        green_column = simulation.to_wave(n / 2 + 0.5, smooth)
        blue_column = simulation.to_wave(n / 4 + 0.75, smooth)

        x = progress % grid_width
        for y in range(histogram_size):
            red = red_column[y]
            green = green_column[y]
            blue = blue_column[y]

            color = (int(red * 255), int(green * 255), int(blue * 255))
            pygame.draw.rect(
                screen,
                color,
                pygame.Rect(x * cell_size, y * cell_size, cell_size, cell_size),
            )

        pygame.display.flip()


if __name__ == "__main__":
    main()
