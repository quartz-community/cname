# @quartz-community/cname

Generates a CNAME file from the baseUrl configuration for custom domain hosting on GitHub Pages.

## Installation

```bash
npx quartz plugin add github:quartz-community/cname
```

## Usage

```ts
// quartz.config.ts
import * as ExternalPlugin from "./.quartz/plugins";

const config: QuartzConfig = {
  plugins: {
    emitters: [ExternalPlugin.CNAME()],
  },
};
```

## Configuration

This plugin has no configuration options.

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/) for more information.

## License

MIT
