import { ApiProperty } from '@nestjs/swagger';

export class ResponseModel<T>{
    @ApiProperty()
    code: number;

    @ApiProperty()
    message: string;

    @ApiProperty()
    data: T;
}