CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    rating INTEGER NOT NULL,
    game_id INTEGER REFERENCES games(id)
);