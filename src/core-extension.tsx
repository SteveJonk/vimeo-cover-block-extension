import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { createElement } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import './style.scss';

/**
 * Add the attribute to the block.
 * This is the attribute that will be saved to the database.
 *
 * @param {object} settings block settings
 * @param {string} name block name
 * @returns {object} modified settings
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#blocks-registerblocktype
 */
addFilter(
  'blocks.registerBlockType',
  'stef/vimeo-cover-block-extension',
  function (settings, name) {
    if (!name.includes('cover')) {
      return settings;
    }

    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        vimeoLink: {
          type: 'string',
        },
      },
    };
  }
);

/**
 * Edit component for the block.
 * This is the configuration that will be rendered in the editor.
 *
 * @param {object} props block props
 * @returns {JSX}
 */
function Edit(props: any) {
  const setvimeoLink = (value: string) => {
    props.setAttributes({ vimeoLink: value });
  };

  return (
    <InspectorControls>
      <PanelBody title={__('Vimeo Link')}>
        <PanelRow>
          <TextControl
            label='Vimeo Link'
            checked={props.attributes.vimeoLink}
            value={props.attributes.vimeoLink}
            onChange={setvimeoLink}
          />
        </PanelRow>
      </PanelBody>
    </InspectorControls>
  );
}

/**
 * Add the edit component to the block.
 * This is the component that will be rendered in the editor.
 * It will be rendered after the original block edit component.
 *
 * @param {function} BlockEdit Original component
 * @returns {function} Wrapped component
 *
 */
addFilter(
  'editor.BlockEdit',
  'stef/gutenberg-extra-attributes',
  createHigherOrderComponent((BlockEdit) => {
    return (props: any) => {
      if (!props.name.includes('cover')) {
        return <BlockEdit {...props} />;
      }

      return (
        <>
          <BlockEdit {...props} />
          <Edit {...props} />
        </>
      );
    };
  }, 'null')
);

/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */

function addVimeoLink(element: any, blockType: any, attributes: any) {
  if (blockType.name !== 'core/cover') {
    return element;
  }

  const { vimeoLink } = attributes;

  if (vimeoLink) {
    const iframeElement = createElement('iframe', {
      src: vimeoLink,
      width: '640',
      height: '360',
      frameborder: '0',
      allow: 'autoplay; fullscreen; picture-in-picture; background',
      allowfullscreen: true,
    });
    return (
      <div className='testoooo'>
        {element}
        {iframeElement}
      </div>
    );
  }

  return element;
}

// Modify the save function of the core cover block
function modifySaveElement(element: any, blockType: any, attributes: any) {
  if (blockType.name !== 'core/cover') {
    return element;
  }

  const { vimeoLink } = attributes;

  if (vimeoLink) {
    const iframeElement = createElement('iframe', {
      src: vimeoLink,
      frameborder: '0',
      allow: 'autoplay; fullscreen; picture-in-picture; background',
      allowfullscreen: true,
    });

    return createElement(
      'div',
      { className: element.props.className, style: element.props.style },
      element.props.children,
      iframeElement
    );
  }

  return element;
}

addFilter('blocks.getSaveElement', 'stef/addVimeoLink', modifySaveElement);
