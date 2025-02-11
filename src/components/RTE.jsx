import { Controller } from 'react-hook-form';
import {Editor} from '@tinymce/tinymce-react'
import PropTypes from 'prop-types'
import conf from '../config/conf'


//This the component to handle the creation of the blog(post) or edit an existing one...
function RTE({name, control, label, defaultValue ="", errors}) {
  return (
    // If you need to integrate the editor with other parts of your application or implement custom features, Controller provides more control.

    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>} 
      <Controller
    name={name || "content"}
    control={control}
    rules={{ required: 'This field is required' }}
    render={({field: {onChange}}) => (
        <Editor
        apiKey={conf.tinyMceApiKey}
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange} //Any changes in the editor field values should call this function, this function is from the controller 
        />
    )}
    />
    {errors[name || "content"] && ( // Display error message
          <p className="text-red-500">{errors[name || "content"].message}</p>
        )}
    </div>
  )
}

RTE.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  errors: PropTypes.object
}

export default RTE