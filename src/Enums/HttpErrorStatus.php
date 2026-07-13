<?php

/**
 * Project: Kadoorie Livewire Components
 * File: HttpErrorStatus.php
 * User: dappelbe
 * Created: 2026-07-03
 * Last updated by: dappelbe
 * Last updated on: 2026-07-03
 * Version: 0.1.0
 */

declare(strict_types=1);

namespace Kadoorie\LivewireComponents\Enums;

enum HttpErrorStatus: int
{
    case Unauthorized = 401;
    case Forbidden = 403;
    case NotFound = 404;
    case MethodNotAllowed = 405;
    case NotAcceptable = 406;
    case PreconditionFailed = 412;
    case ServerError = 500;
    case NotImplemented = 501;
    case BadGateway = 502;

    public function title(): string
    {
        return match ($this) {
            self::Unauthorized => 'Authentication required',
            self::Forbidden => 'Access denied',
            self::NotFound => 'Page not found',
            self::MethodNotAllowed => 'Method not allowed',
            self::NotAcceptable => 'Not acceptable',
            self::PreconditionFailed => 'Precondition failed',
            self::ServerError => 'Something went wrong',
            self::NotImplemented => 'Not implemented',
            self::BadGateway => 'Bad gateway',
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::Unauthorized => 'You need to sign in to view this page.',
            self::Forbidden => 'You do not have permission to access this page.',
            self::NotFound => 'We could not find the page you were looking for.',
            self::MethodNotAllowed => 'That action is not allowed on this resource.',
            self::NotAcceptable => 'This resource cannot produce a response matching your request.',
            self::PreconditionFailed => 'A precondition for this request was not met.',
            self::ServerError => 'Something went wrong on our end. Please try again later.',
            self::NotImplemented => 'This feature is not available yet.',
            self::BadGateway => 'We received an invalid response from an upstream server.',
        };
    }
}
