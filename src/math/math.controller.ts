import { Body, Controller, Logger, Post } from '@nestjs/common';
import { MathService } from './math.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('math')
export class MathController {
  private logger = new Logger('MathController');
  constructor(private readonly mathService: MathService) {}

  @Post('sum')
  sum(@Body('numbers') numbers: number[]): number {
    this.logger.log('Adding ' + numbers.toString());
    return this.mathService.accumulate(numbers);
  }

  @MessagePattern({ cmd: 'sum' })
  sum2(data: number[]): number {
    this.logger.log('Adding ' + data.toString());
    return this.mathService.accumulate(data);
  }
}
