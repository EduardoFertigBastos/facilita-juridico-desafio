import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'O nome do cliente é obrigatório!'),
  phone: z.string().min(11, 'O telefone deve ter 11 dígitos!'),
  email: z.string().email('O email deve ser um email válido!'),

  coordinate_x: z.number({
    required_error: 'A coordenada X é obrigatória!',
  }),
  coordinate_y: z.number({
    required_error: 'A coordenada Y é obrigatória!',
  }),
});

export default schema;
