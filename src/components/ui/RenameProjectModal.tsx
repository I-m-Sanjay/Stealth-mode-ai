import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface RenameProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newName: string) => void;
  currentName: string;
  isLoading?: boolean;
}

// Validation schema using Yup
const validationSchema = Yup.object({
  projectName: Yup.string()
    .required('Project name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be less than 50 characters')
    .trim()
});

const RenameProjectModal: React.FC<RenameProjectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentName,
  isLoading = false
}) => {
  const handleSubmit = (values: { projectName: string }, { setSubmitting }: any) => {
    const trimmedName = values.projectName.trim();
    
    if (trimmedName === currentName) {
      onClose();
      return;
    }
    
    onConfirm(trimmedName);
    setSubmitting(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent, submitForm: () => void) => {
    if (e.key === 'Enter') {
      submitForm();
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0  bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Rename project
          </h3>
          
          {/* Instruction */}
          <p className="text-gray-500 text-sm mb-4">
            Give your project a new name.
          </p>
          
          <Formik
            initialValues={{ projectName: currentName }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ errors, touched, isSubmitting, submitForm }) => (
              <Form>
                {/* Input Field */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Project Name
                  </label>
                  <Field
                    type="text"
                    name="projectName"
                    onKeyPress={(e: React.KeyboardEvent) => handleKeyPress(e, submitForm)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors ${
                      errors.projectName && touched.projectName ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'
                    }`}
                    placeholder="Enter project name"
                    disabled={isLoading}
                  />
                  <ErrorMessage
                    name="projectName"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                
               
                
                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Renaming...
                      </div>
                    ) : (
                      'Rename Project'
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RenameProjectModal; 