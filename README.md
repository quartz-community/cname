# @quartz-community/cname

Writes a `CNAME` file to the root of the output folder containing the hostname of `configuration.baseUrl` (for `baseUrl: quartz.example.com/docs` that is `quartz.example.com`), for custom domain hosting on GitHub Pages and similar hosts. If `baseUrl` is not set, the plugin warns and writes nothing.

## Installation

```bash
npx quartz plugin add @quartz-community/cname
```

It is already included (and enabled) in the default `quartz.config.yaml`.

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/cname"
    enabled: true
```

## Configuration

This plugin has no configuration options.

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/plugins/CNAME) for more information.

## License

MIT
