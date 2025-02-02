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

import React from 'react';
import { BlockLayout } from '@lowdefy/layout';
import { makeContextId } from '@lowdefy/engine';
import { makeCssClass } from '@lowdefy/block-tools';

import Container from './Container';
import Context from './Context';
import List from './List';

const CategorySwitch = ({ block, Blocks, Component, context, lowdefy }) => {
  if (!block.eval) return null; // Renderer updates before eval is executed for the first time on lists. See #520
  if (block.eval.visible === false)
    return <div id={`vs-${block.blockId}`} style={{ display: 'none' }} />;

  switch (block.meta.category) {
    case 'context':
      return (
        <Context
          block={block}
          context={context}
          contextId={makeContextId({
            urlQuery: lowdefy.urlQuery,
            pageId: lowdefy.pageId,
            blockId: block.blockId,
          })}
          lowdefy={lowdefy}
          render={(context) => (
            <Container
              block={context.RootBlocks.areas.root.blocks[0]}
              Blocks={context.RootBlocks}
              Component={Component}
              context={context}
              lowdefy={lowdefy}
            />
          )}
        />
      );
    case 'list':
      return (
        <List
          block={block}
          Blocks={Blocks}
          Component={Component}
          context={context}
          lowdefy={lowdefy}
        />
      );
    case 'container':
      return (
        <Container
          block={block}
          Blocks={Blocks}
          Component={Component}
          context={context}
          lowdefy={lowdefy}
        />
      );
    case 'input':
      return (
        <BlockLayout
          id={`bl-${block.blockId}`}
          blockStyle={block.eval.style}
          highlightBorders={lowdefy.lowdefyGlobal.highlightBorders}
          layout={block.eval.layout || {}}
          makeCssClass={makeCssClass}
        >
          <Component
            methods={Object.assign(block.methods, {
              makeCssClass,
              registerEvent: block.registerEvent,
              registerMethod: block.registerMethod,
              setValue: block.setValue,
              triggerEvent: block.triggerEvent,
            })}
            blockId={block.blockId}
            events={block.eval.events}
            homePageId={lowdefy.homePageId}
            key={block.blockId}
            loading={block.loading}
            menus={lowdefy.menus}
            pageId={lowdefy.pageId}
            properties={block.eval.properties}
            required={block.eval.required}
            user={lowdefy.user}
            validation={block.eval.validation}
            value={block.value}
          />
        </BlockLayout>
      );
    default:
      return (
        <BlockLayout
          id={`bl-${block.blockId}`}
          blockStyle={block.eval.style}
          highlightBorders={lowdefy.lowdefyGlobal.highlightBorders}
          layout={block.eval.layout || {}}
          makeCssClass={makeCssClass}
        >
          <Component
            methods={Object.assign(block.methods, {
              makeCssClass,
              registerEvent: block.registerEvent,
              registerMethod: block.registerMethod,
              triggerEvent: block.triggerEvent,
            })}
            events={block.eval.events}
            blockId={block.blockId}
            homePageId={lowdefy.homePageId}
            key={block.blockId}
            loading={block.loading}
            menus={lowdefy.menus}
            pageId={lowdefy.pageId}
            properties={block.eval.properties}
            required={block.eval.required}
            user={lowdefy.user}
            validation={block.eval.validation}
          />
        </BlockLayout>
      );
  }
};

export default CategorySwitch;
