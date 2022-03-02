import { GithubReleasesDatasource } from '../../datasource/github-releases';
import { logger } from '../../logger';
import { id as semverVersioning } from '../../modules/versioning/semver';
import { regEx } from '../../util/regex';
import type { PackageDependency, PackageFile } from '../types';

const VERSION_REGEX = regEx(/^\s+VERSION="(.*)"$/m);

export function extractPackageFile(fileContent: string): PackageFile | null {
  logger.trace('batect.extractPackageFile()');
  const match = VERSION_REGEX.exec(fileContent);

  if (match === null) {
    return null;
  }

  const dependency: PackageDependency = {
    depName: 'batect/batect',
    commitMessageTopic: 'Batect',
    currentValue: match[1],
    datasource: GithubReleasesDatasource.id,
    versioning: semverVersioning,
  };

  logger.trace(dependency, 'Found Batect wrapper version');

  return { deps: [dependency] };
}
