import { Resolver } from '@nestjs/graphql';
import { Review } from './entities/review.entity';
// import { ReviewsService } from './reviews.service';
// import { CreateReviewInput } from './dto/create-review.input';
// import { UpdateReviewInput } from './dto/update-review.input';

@Resolver(() => Review)
export class ReviewsResolver {
  // constructor(private readonly reviewsService: ReviewsService) {}
}
