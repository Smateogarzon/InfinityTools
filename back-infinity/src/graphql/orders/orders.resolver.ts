import { Resolver } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
// import { OrdersService } from './orders.service';
// import { CreateOrderInput } from './dto/create-order.input';
// import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => Order)
export class OrdersResolver {
  // constructor(private readonly ordersService: OrdersService) {}
}
