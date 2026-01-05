import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


function onSubmit(values: z.infer<typeof SignUpValidation>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values)
}


const SignUpForm = () => {
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  })
  return (
    <Form {...form}>
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center space-y-6">
        
        {/* Logo */}
        <div className="mb-4">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            className="h-10"
          />
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create new account</h2>
        </div>

        {/* Form */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </Form>
  )
}

export default SignUpForm