import { Test, TestingModule } from '@nestjs/testing';
import { TarjetaService } from './tarjeta.service';

describe('TarjetaService', () => {
  let service: TarjetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TarjetaService],
    }).compile();

    service = module.get<TarjetaService>(TarjetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
