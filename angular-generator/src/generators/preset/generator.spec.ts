/** @jest-environment node */
import { readJson } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import presetGenerator from './generator';

describe('preset quality guardrails', () => {
  const argv = process.argv;
  beforeAll(() => {
    process.argv = [...argv, '--non-interactive'];
  });
  afterAll(() => {
    process.argv = argv;
  });

  it.each(['angular', 'ngrx', 'standalone-ngrx'])(
    'installs the packaged hook and style checks for %s',
    async (flavor) => {
      const tree = createTreeWithEmptyWorkspace();
      await presetGenerator(tree, { name: 'example', flavor });

      expect(tree.exists('.husky/pre-commit')).toBe(true);
      expect(tree.exists('scripts/pre-commit-qa')).toBe(true);
      expect(readJson(tree, 'package.json')).toMatchObject({
        scripts: {
          prepare: 'husky',
          lint: 'npm run lint:eslint && npm run lint:styles',
          prettier: 'prettier --check .',
          'test:ci': 'nx test --watch=false --coverage',
          'sonar:scan': 'sonar-scanner',
        },
        devDependencies: {
          husky: '^9.1.7',
          'stylelint-config-standard-scss': '^14.0.0',
        },
      });
      expect(readJson(tree, 'package.json').scripts.sonar).toBeUndefined();
    },
    60000
  );
});
