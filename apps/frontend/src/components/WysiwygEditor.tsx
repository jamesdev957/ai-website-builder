import React, { useCallback, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Paper, Typography } from '@mui/material';

interface WysiwygEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
}

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start typing...',
  height = 300,
}) => {
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  }), []);

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'align', 'blockquote', 'code-block',
    'list', 'bullet', 'link', 'image'
  ];

  const handleChange = useCallback((content: string) => {
    onChange(content);
  }, [onChange]);

  return (
    <Paper elevation={1} sx={{ overflow: 'hidden', borderRadius: 2 }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" color="primary">
          Content Editor
        </Typography>
      </Box>
      <Box sx={{ '& .ql-container': { minHeight: height } }}>
        <ReactQuill
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{
            height: height,
          }}
        />
      </Box>
    </Paper>
  );
};

export default WysiwygEditor;