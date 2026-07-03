# Release Checklist

Steps to cut a tagged release of `kadoorie/livewire-components`.

## Versioning

This package follows [Semantic Versioning](https://semver.org). The version is
derived from the Git tag — do **not** add a `version` field to `composer.json`.

## Pre-release checks

Run the full quality suite inside the container and confirm everything is green:

```bash
docker exec kadoorie-app ./vendor/bin/pint --test
docker exec kadoorie-app ./vendor/bin/phpstan analyse
docker exec kadoorie-app ./vendor/bin/pest --compact
docker exec kadoorie-app npm run lint
docker exec kadoorie-app npm run format:check
docker exec kadoorie-app npm run test:js
docker exec kadoorie-app composer audit
docker exec kadoorie-app npm audit --audit-level=high
```

Rebuild the publishable stylesheet and the static showcase so both are current:

```bash
docker exec kadoorie-app npm run build
docker exec kadoorie-app vendor/bin/testbench kadoorie:build-showcase
```

Then:

- [ ] `CHANGELOG.md` has a dated section for the new version.
- [ ] `resources/dist/kadoorie.css` is rebuilt and committed.
- [ ] `docs/showcase/` is regenerated and committed.
- [ ] CI is green on the release commit.

## Tag and publish

```bash
git tag -a v0.1.0 -m "Release 0.1.0"
git push origin v0.1.0
```

Because distribution is private over VCS, consuming apps pick up the tag through
their `repositories` entry — no Packagist publish step is required.

## Consuming the release

In the host application's `composer.json`:

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "git@github.com:kadoorie/livewire-components.git"
        }
    ],
    "require": {
        "kadoorie/livewire-components": "^0.1"
    }
}
```

```bash
composer require kadoorie/livewire-components:^0.1
```

## Optional: publish the showcase to GitHub Pages

The `docs/showcase/` directory is self-contained (flat HTML + `kadoorie.css`).
Enable GitHub Pages for the `docs/` folder, or copy `docs/showcase/` to your
Pages branch, to host the rendered component gallery.
