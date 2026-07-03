# Coding Style

All comments, variable names, method names, and documentation must be in English.
Use strict typing in every PHP file. No exceptions.

## Controller Pattern

Controllers should be thin. They validate, delegate to a service, and return a response.
Single-action controllers are preferred for non-CRUD endpoints.

### Good controller example:

```php
<?php
declare(strict_types=1);
namespace App\Http\Controllers\Api\V1;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
// Single-action controller: one endpoint, one job
class StoreOrderController
{
    public function __invoke(
        StoreOrderRequest $request,
        OrderService $orderService,
    ): JsonResponse {
        // Controller does not contain business logic.
        // It validates (via FormRequest), delegates, and returns.
        $order = $orderService->create($request->validated());
        return OrderResource::make($order)
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }
}
```

### Bad controller example (do not follow)
