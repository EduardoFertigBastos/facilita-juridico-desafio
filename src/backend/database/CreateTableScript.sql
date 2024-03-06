CREATE TABLE IF NOT EXISTS public.clients (
    id SERIAL NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    coordinate_x numeric(8,3) NOT NULL,
    coordinate_y numeric(8,3) NOT NULL,
    created_at date DEFAULT now(),
    CONSTRAINT clients_pkey PRIMARY KEY (id)
)