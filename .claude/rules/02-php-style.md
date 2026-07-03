# PHP Style

## Language

- Use PHP-FIG PER Coding Style 3.0.
- Every PHP file must begin with the project file header.
- Every PHP file must declare strict types.
- Use curly braces for all control structures, including single-line bodies.
- Type all method parameters, return values, and properties.
- Prefer constructor property promotion for dependencies.
- Do not leave empty zero-parameter constructors unless the constructor is
  private.
- Prefer `match` over `switch` whenever possible.
- Use TitleCase for enum cases.
- Prefer PHPDoc blocks over inline comments.
- Use inline comments only when the reason is not obvious from the code.
- Use PHPDoc array shape definitions where array structure matters.

## File Header

Use this header for PHP files:

```php
/**
 * Project: SMC Tennis Website
 * File: <filename>
 * User: <username>
 * Created: <date>
 * Last updated by: <username>
 * Last updated on: <date>
 * Version: 0.1.0
 */
```

The pre-commit hook updates `Last updated by`, `Last updated on`, and
`Version` for staged PHP files that already contain this header.

## Comments

- Do not add comments above methods or code blocks when the code is obvious.
- Do not add PHPDoc comments for variables unless needed for type clarity,
  such as `/** @var \App\Models\User $currentUser */`.
- Do not add TODO comments unless there is a corresponding issue.

## Controller Pattern

Controllers validate, delegate to a service, and return a response. They do
not contain business logic.

Good single-action controller:

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Order\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class StoreOrderController
{
    public function __construct(
        private readonly OrderService $orderService,
    ) {
    }

    public function __invoke(StoreOrderRequest $request): JsonResponse
    {
        $order = $this->orderService->create($request->validated());

        return OrderResource::make($order)
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }
}
```

Avoid fat controllers:

```php
<?php

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        $order = new Order();
        $order->user_id = auth()->id();
        $order->total = 0;

        foreach ($data['items'] as $item) {
            $order->total += $item['price'] * $item['qty'];
        }

        $order->save();

        return response()->json($order);
    }
}
```

## Model Pattern

- Define `$fillable` explicitly. Do not use `$guarded = []`.
- Use enums for status and type fields.
- Add return types to relationships.
- Type scopes and give them descriptive names.

Example model:

```php
<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'status',
        'total_amount',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'status' => OrderStatus::class,
            'total_amount' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', OrderStatus::Pending);
    }
}
```

## Pint

- After changing a PHP file, check the whole changed file against PER.
- Use the project Pint command through Docker:

```bash
docker exec app ./vendor/bin/pint --dirty --format agent
```

Do not conclude work with pending Pint changes.
