/*
  Copyright 2020-2021 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import runInstance from '../runInstance';
import runClass from '../runClass';

const metaInstance = {
  hasOwnProperty: { namedArgs: ['on', 'prop'], validTypes: ['array', 'object'] },
};

const metaClass = {
  keys: { singleArg: true, validTypes: ['object'] },
  values: { singleArg: true, validTypes: ['object'] },
  assign: { spreadArgs: true, validTypes: ['array'] },
  defineProperty: { namedArgs: ['on', 'key', 'descriptor'], validTypes: ['array', 'object'] },
};

function _object({ params, location, methodName }) {
  if (methodName === 'hasOwnProperty') {
    return runInstance({
      location,
      meta: metaInstance,
      methodName,
      operator: '_object',
      params,
      instanceType: 'object',
    });
  }
  return runClass({
    functions: Object,
    location,
    meta: metaClass,
    methodName,
    operator: '_object',
    params,
  });
}

export default _object;
