import { Test, TestingModule } from '@nestjs/testing';
import { TipoGastoService } from './tipo-gasto.service';

describe('TipoGastoService', () => {
  let service: TipoGastoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoGastoService],
    }).compile();

    service = module.get<TipoGastoService>(TipoGastoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
