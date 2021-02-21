import React from 'react';
import { useFormik } from 'formik';
import { useCreateRoomMutation } from '../api';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import clsx from 'clsx';

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export const NewRoom = () => {
  const router = useRouter();

  const host = typeof window !== 'undefined' ? window?.location?.host : '';

  // const name =
  //   typeof router.query?.community === 'string' && router.query?.community;

  // const communityQuery = useCommunityQuery({
  //   variables: { name },
  //   skip: !name,
  // });

  // const community = communityQuery?.data?.community;

  // const communityId = community?.id;

  const [createRoom] = useCreateRoomMutation({
    onCompleted: (data) => {
      // router.push(`/${name}/${data.createRoom.name}`);
      router.push(`/${data.createRoom.name}`);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      title: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      createRoom({
        // variables: { input: { ...values, communityId } },
        variables: { input: { ...values } },
      });
    },
  });

  const isError = Object.keys(formik.errors).length > 0;

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title" className="text-gray-400 text-sm">
        Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        autoFocus
        minLength={1}
        maxLength={50}
        placeholder="Awesome Room"
        onChange={formik.handleChange}
        value={formik.values.title}
        className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <label htmlFor="name" className="text-gray-400 text-sm">
        <span>
          {/* {host}/{name}/ */}
          {host}/
        </span>
        <span className="text-white">{formik.values.name || 'awesome'}</span>
      </label>
      <input
        id="name"
        name="name"
        type="text"
        minLength={1}
        maxLength={50}
        placeholder="awesome"
        onChange={formik.handleChange}
        value={formik.values.name}
        className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <div className="flex w-full justify-end mt-2">
        <button
          type="submit"
          disabled={isError}
          className={clsx('btn-primary', isError && 'cursor-not-allowed')}
        >
          Create
        </button>
      </div>
    </form>
  );
};
