import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class RichTextEditor extends Component {
  static propTypes = {
      desc: PropTypes.string,
      changeText: PropTypes.func
  }

  state = {
    editorState: EditorState.createEmpty()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.desc === nextProps.desc) {
      // 匹配富文本编辑器格式，回显保存的内容
      const contentBlock = htmlToDraft(nextProps.desc);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({ editorState })
      }
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
    // this.props.changeText(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperStyle={{
            width: '80%',
            paddingBottom: '80px'
          }}
          editorStyle={{
            border: '1px solid rgba(217, 217, 217, .44)',
            minHeight: '100%',
            padding: '0 20px'
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
export default RichTextEditor