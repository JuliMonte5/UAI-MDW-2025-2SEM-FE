import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const schema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
});

export const FormDemo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" {...register("firstName")} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" {...register("lastName")} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
